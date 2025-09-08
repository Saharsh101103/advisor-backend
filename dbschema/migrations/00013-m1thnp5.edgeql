CREATE MIGRATION m1thnp5banv3eq4hvvwsxfvzrtmqmhdat4ifwsxsc47ywjowuutvya
    ONTO m1v3nyokpb2iwnkoug5dcydvsij7smafnzr32ezg5uoe3ajkpjp7pa
{
  CREATE SCALAR TYPE default::DegreeStatus EXTENDING enum<COMPLETED, IN_PROGRESS, NOT_STARTED>;
  CREATE TYPE default::CourseRequirement EXTENDING default::Object {
      CREATE REQUIRED LINK course: default::Course;
      CREATE REQUIRED PROPERTY status: default::CourseStatus;
  };
  CREATE TYPE default::RequirementCategory EXTENDING default::Object {
      CREATE MULTI LINK courses := ({default::CourseRequirement});
      CREATE REQUIRED PROPERTY completed_credits: std::int16;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY required_credits: std::int16;
  };
  CREATE TYPE default::DegreeRequirement EXTENDING default::Object {
      CREATE MULTI LINK categories: default::RequirementCategory;
      CREATE REQUIRED PROPERTY major: std::str;
      CREATE REQUIRED PROPERTY serial_id: default::SerialId;
      CREATE REQUIRED PROPERTY total_credits: std::int16;
  };
};
