/* 
    This file contains all the usable database queries 
    which are imported by server.js
*/

exports.SELECT_ALL_USER = "SELECT * FROM user;";

exports.SELECT_ALL_FROM_USER_GIVEN_USERNAME_AND_PASSWORD = function (username, password) {
  return `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;
};

exports.INSERT_NEW_USER = function (username, password, email, fistname, lastname) {
  return `INSERT INTO user(\`username\`, \`password\`, \`email\`, \`first_name\`, \`last_name\`, \`is_admin\`) VALUES('${username}','${password}', '${email}','${fistname}', '${lastname}','0')`;
};

exports.INSERT_NEW_USER2 = function (username, password, email, fistname, lastname) {
  return `INSERT INTO user(\`username\`, \`password\`, \`email\`, \`first_name\`, \`last_name\`, \`is_admin\`) VALUES('${username}','${password}', '${email}','${fistname}', '${lastname}','0')`;
};

exports.SELECT_USER_VIA_USERNAME = function(username) {
  return `SELECT * FROM user WHERE username = '${username}'`;
}

exports.UPDATE_USER = function (
  username,

  firstname,
  surname,
  email,
  middlename,
  gender,
  civilstatus,
  classification,
  position,
  course,
  yearlevel,
  citizenship,
  placeofbirth,
  birthday,
  height,
  weight,
  bloodtype,
  address,
  mobilenumber,
  specialskills,
  languages,
  organizations,
  illness,
  beneficiaryname,
  beneficiaryrelationship,
  beneficiarycontactnumber,
  beneficiaryaddress,
  contactpersonname,
  contactpersonrelationship,
  contactpersoncontactnumber,
  contactpersonaddress,
  brieflyexplainyourreason
) {
  return `
    UPDATE user 
    SET
      \`first_name\` = '${firstname}',
      \`last_name\` = '${surname}', 
      \`email\` = '${email}',
      \`middle_name\` = '${middlename}', 
      \`gender\` = '${gender}', 
      \`civil_status\` = '${civilstatus}',
      \`classification\` = '${classification}',
      \`position\` = '${position}',
      \`course\` = '${course}',
      \`year_level\` = '${yearlevel}',
      \`citizenship\` = '${citizenship}',
      \`birth_place\` = '${placeofbirth}',
      \`birth_date\` = '${birthday}',
      \`height\` = '${height}',
      \`weight\` = '${weight}',
      \`blood_type\` = '${bloodtype}',
      \`address\` = '${address}',
      \`mobile_number\` = '${mobilenumber}',
      \`skills\` = '${specialskills}',
      \`languages\` = '${languages}',
      \`organizations\` = '${organizations}',
      \`illness\` = '${illness}',
      \`beneficiary_name\` = '${beneficiaryname}',
      \`beneficiary_relationship\` = '${beneficiaryrelationship}',
      \`beneficiary_contact_number\` = '${beneficiarycontactnumber}',
      \`beneficiary_address\` = '${beneficiaryaddress}',
      \`contact_person_name\` = '${contactpersonname}',
      \`contact_person_relationship\` = '${contactpersonrelationship}',
      \`contact_person_contact_number\` = '${contactpersoncontactnumber}',
      \`contact_person_address\` = '${contactpersonaddress}',
      \`reason\` = '${brieflyexplainyourreason}'
    WHERE \`username\` = '${username}'
  `;
  
};