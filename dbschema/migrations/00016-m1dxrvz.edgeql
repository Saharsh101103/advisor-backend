CREATE MIGRATION m1dxrvzqflbrrcjkzijwyygvhmfebifn5qciwi5mwpc3fr7f4a66hq
    ONTO m12htvrqwlrpuquo7e7uqacuu2u6hykrlgn4dmq4dadcz6f4qxsg4q
{
  CREATE TYPE default::AdvisingMeeting EXTENDING default::Object {
      CREATE REQUIRED LINK advisor: default::Advisor;
      CREATE REQUIRED LINK student: default::Student;
      CREATE REQUIRED PROPERTY date: std::datetime;
      CREATE REQUIRED PROPERTY status: std::str {
          CREATE CONSTRAINT std::one_of('SCHEDULED', 'COMPLETED', 'CANCELLED');
      };
  };
};
