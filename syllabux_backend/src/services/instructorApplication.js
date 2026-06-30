import pool from '../config/db.js'

export async function create({about_self,linkedin_url,years_of_experience,expertise_summary,resume_link,user_id}){
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      `INSERT INTO InstructorApplication (user_id, about_self, linkedin_url, years_of_experience, expertise_summary, resume_link)
      VALUES(?, ?, ?, ?, ?, ?)`, [user_id, about_self, linkedin_url, years_of_experience, expertise_summary, resume_link]
    );
    await conn.query(
      `INSERT INTO ApplicationDecision (application_id, status)
      VALUES(?, ?)`, [result.insertId, 'pending']
    );
    await conn.commit();
    return{
      application_id: result.insertId,
      status: 'pending'
    }
  } catch (error) {
      await conn.rollback();
      console.error(`Error: ${error}`);
      throw error
  } finally{
    conn.release();
  }
}

