CREATE MIGRATION m1n3wrceeskkg6njw24b4gppmrzuyqtq47ynepczlwr3sweanvmewq
    ONTO m1thnp5banv3eq4hvvwsxfvzrtmqmhdat4ifwsxsc47ywjowuutvya
{
  ALTER TYPE default::CourseRequirement {
      CREATE REQUIRED PROPERTY serial_id: default::SerialId {
          SET REQUIRED USING (<default::SerialId>{});
      };
  };
  ALTER TYPE default::RequirementCategory {
      CREATE REQUIRED PROPERTY serial_id: default::SerialId {
          SET REQUIRED USING (<default::SerialId>{});
      };
  };
};
