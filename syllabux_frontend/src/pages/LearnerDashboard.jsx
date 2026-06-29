import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseGrid from "../components/learner/CourseGrid";
import DashboardControls from "../components/learner/DashboardControls";
import DashboardHero from "../components/learner/DashboardHero";
import FiltersSidebar from "../components/learner/FiltersSidebar";
import FloatingSearchBar from "../components/learner/FloatingSearchBar";
import SideNavigation from "../components/learner/SideNavigation";
import { getLearnerDashboardData } from "../data/learnerDashboard";
import { useAuth } from "../auth/authContext";

function LearnerDashboard() {
  const { logout, user } = useAuth();
  const dashboard = useMemo(() => {
    const data = getLearnerDashboardData();
    return {
      ...data,
      learner: {
        ...data.learner,
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`.trim(),
      },
    };
  }, [user]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [checkedFilters, setCheckedFilters] = useState(() => {
    const initial = {};

    dashboard.filters.groups.forEach((group) => {
      group.options.forEach((option) => {
        initial[option.id] = option.checked;
      });
    });

    return initial;
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingSearch(window.scrollY > 180);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeFilterLabels = dashboard.filters.groups.flatMap((group) =>
    group.options
      .filter((option) => checkedFilters[option.id])
      .map((option) => option.label),
  );

  const visibleCourses = dashboard.courses.filter((course) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return true;
    }

    return `${course.title} ${course.description}`
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const toggleFilter = (optionId) => {
    setCheckedFilters((current) => ({
      ...current,
      [optionId]: !current[optionId],
    }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_50%,#f9f9f8_0%,#ece0dc_100%)] font-body-md text-on-surface">
      <SideNavigation
        learner={dashboard.learner}
        navigation={dashboard.navigation}
        onLogout={() => {
          logout();
          navigate("/");
        }}
      />
      <FloatingSearchBar
        isVisible={showFloatingSearch || searchQuery.length > 0}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="relative min-h-screen lg:ml-24">
        <section className="px-margin-mobile py-14 md:px-margin-tablet lg:px-margin-desktop lg:py-16">
          <DashboardHero hero={dashboard.hero} />
          <DashboardControls onOpenFilters={() => setIsFiltersOpen(true)} />
          <CourseGrid courses={visibleCourses} />
        </section>

        <FiltersSidebar
          activeFilterLabels={activeFilterLabels}
          checkedFilters={checkedFilters}
          filterGroups={dashboard.filters.groups}
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          onToggleFilter={toggleFilter}
        />
      </main>
    </div>
  );
}

export default LearnerDashboard;
