import { useEffect, useRef } from 'react'

function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl =
      canvas?.getContext('webgl') || canvas?.getContext('experimental-webgl')

    if (!canvas || !gl) {
      return undefined
    }

    let frameId
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const syncSize = () => {
      const width = canvas.clientWidth || 1280
      const height = canvas.clientHeight || 720

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(syncSize)
    resizeObserver?.observe(canvas)
    syncSize()

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
          -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec3 mist = vec3(0.91, 0.89, 0.87);
        vec3 blue = vec3(0.78, 0.82, 0.85);
        vec3 ivory = vec3(0.95, 0.94, 0.92);
        float noise1 = snoise(uv * 1.5 + u_time * 0.05);
        float noise2 = snoise(uv * 2.0 - u_time * 0.03);
        vec3 color = mix(mist, blue, noise1 * 0.5 + 0.5);
        color = mix(color, ivory, noise2 * 0.4);
        color *= 1.0 - distance(uv, vec2(0.5)) * 0.15;
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    gl.attachShader(
      program,
      createShader(gl.VERTEX_SHADER, vertexShaderSource),
    )
    gl.attachShader(
      program,
      createShader(gl.FRAGMENT_SHADER, fragmentShaderSource),
    )
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const timeUniform = gl.getUniformLocation(program, 'u_time')
    const resolutionUniform = gl.getUniformLocation(program, 'u_resolution')

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()

      if (!rect.width || !rect.height) {
        return
      }

      mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width
      mouse.y = (1 - (event.clientY - rect.top) / rect.height) * canvas.height
    }

    const render = (time) => {
      if (!resizeObserver) {
        syncSize()
      }

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(timeUniform, time * 0.001)
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove)
    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-surface">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,249,248,0.1)_0%,rgba(249,249,248,0.4)_100%)]" />
    </div>
  )
}

export default ShaderBackground
