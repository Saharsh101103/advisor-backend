CREATE MIGRATION m17vv5swmqojsv6qn3catp5a57trlgfsexzhwhj3t7ol2a2opiha2q
    ONTO m1uajlmvcs3omzg7qctdjvk3c62wxsk2ohsinx4mf25yvg2cx3gbnq
{
  CREATE TYPE default::Enrollment EXTENDING default::Object {
      CREATE REQUIRED LINK course: default::Course;
      CREATE REQUIRED LINK student: default::Student;
      CREATE REQUIRED PROPERTY instructor: std::str;
      CREATE OPTIONAL PROPERTY progress: std::int16;
      CREATE REQUIRED PROPERTY status: std::str {
          CREATE CONSTRAINT std::one_of('in-progress', 'upcoming', 'completed');
      };
  };
};
