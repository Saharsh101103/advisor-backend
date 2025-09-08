CREATE MIGRATION m1m3atrpnc54ldqxpvnndiciylrkl2yjr4uxjt5qlmbd6kemqpdckq
    ONTO m1jwv74kmgr7vhzfm4yrnaxdlj55npbyway3xpsaxnh7ybonebeila
{
  CREATE SCALAR TYPE default::CourseStatus EXTENDING enum<UPCOMING, IN_PROGRESS, COMPLETED>;
  ALTER TYPE default::Enrollment {
      ALTER PROPERTY status {
          DROP CONSTRAINT std::one_of('in-progress', 'upcoming', 'completed');
          SET TYPE default::CourseStatus;
      };
  };
};
