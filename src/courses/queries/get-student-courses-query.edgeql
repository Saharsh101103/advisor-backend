SELECT Enrollment{
course:{
serial_id,
code,
title,
credits
  },
 instructor:{
    user: {
        name
      }
  },
  *
  
  }
  FILTER .student.user.serial_id = <int16>$student_id AND .status = <CourseStatus>$status
