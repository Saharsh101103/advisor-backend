WITH
  categories := (SELECT RequirementCategory FILTER .serial_id IN array_unpack(<array<int64>>$categories))
INSERT DegreeRequirement {
  major := <str>$major,
  total_credits := <int16>$total_credits,
  categories := categories
};
