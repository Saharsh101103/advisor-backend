CREATE MIGRATION m1filnxwfmbyjiqza7zfwuttxr2lpgegggfb7xe6nbqezhkjr6dgba
    ONTO m1i4zkvlxklsox54mqo5i4bai7k3uvwhb335jz6rggpdlpptlraelq
{
  CREATE SCALAR TYPE default::Role EXTENDING enum<STUDENT, ADVISOR>;
  CREATE SCALAR TYPE default::SerialId EXTENDING std::sequence;
  CREATE ABSTRACT TYPE default::Object {
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY is_deleted: std::bool {
          SET default := false;
      };
      CREATE PROPERTY updated_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  CREATE TYPE default::User EXTENDING default::Object {
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY serial_id: default::SerialId;
  };
  CREATE TYPE default::Advisor EXTENDING default::Object {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY department: std::str;
      CREATE OPTIONAL PROPERTY office: std::str;
      CREATE OPTIONAL PROPERTY office_hours: std::str;
      CREATE OPTIONAL PROPERTY phone: std::str;
      CREATE REQUIRED PROPERTY role: default::Role;
  };
  CREATE TYPE default::Student EXTENDING default::Object {
      CREATE REQUIRED LINK advisor: default::Advisor;
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY completed_credits: std::int16;
      CREATE REQUIRED PROPERTY enrollment_year: std::int16;
      CREATE REQUIRED PROPERTY expected_graduation: std::int16;
      CREATE REQUIRED PROPERTY gpa: std::float32;
      CREATE REQUIRED PROPERTY major: std::str;
      CREATE REQUIRED PROPERTY required_credits: std::int16;
      CREATE REQUIRED PROPERTY role: default::Role;
  };
};
