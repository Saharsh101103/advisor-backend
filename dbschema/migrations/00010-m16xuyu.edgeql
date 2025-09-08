CREATE MIGRATION m16xuyu4szrgji2ufi2t6c34dwobezq4vs3sef2bwqw2lzrfsolrrq
    ONTO m1w5hcxdxmdgt4rpjrb5dc7moqv6oql2jt3plnfxwn2pgikdum5z3a
{
  CREATE SCALAR TYPE default::EventType EXTENDING enum<class, advising, deadline>;
  CREATE TYPE default::Announcement EXTENDING default::Object {
      CREATE REQUIRED PROPERTY author: std::str;
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY date: std::datetime;
      CREATE REQUIRED PROPERTY serial_id: default::SerialId;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Event EXTENDING default::Object {
      CREATE REQUIRED PROPERTY date: std::datetime;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE OPTIONAL PROPERTY location: std::str;
      CREATE REQUIRED PROPERTY serial_id: default::SerialId;
      CREATE REQUIRED PROPERTY time: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY type: default::EventType;
  };
};
