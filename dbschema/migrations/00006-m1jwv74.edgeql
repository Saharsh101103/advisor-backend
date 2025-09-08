CREATE MIGRATION m1jwv74kmgr7vhzfm4yrnaxdlj55npbyway3xpsaxnh7ybonebeila
    ONTO m17vv5swmqojsv6qn3catp5a57trlgfsexzhwhj3t7ol2a2opiha2q
{
  ALTER TYPE default::Enrollment {
      DROP PROPERTY instructor;
  };
  ALTER TYPE default::Enrollment {
      CREATE REQUIRED LINK instructor: default::Advisor {
          SET REQUIRED USING (<default::Advisor>{});
      };
  };
};
