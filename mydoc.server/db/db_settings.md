#테이블 세팅
1. 질환

  CREATE TABLE tb_disease_info (
      dname VARCHAR(50) NOT NULL,
      target VARCHAR(50) NOT NULL,
      cause VARCHAR(1024),
      effect_type VARCHAR(100),
      effect VARCHAR(1024),
      treat_no_surgery VARCHAR(1024),
      treat_physic_1 VARCHAR(1024),
      treat_physic_2 VARCHAR(1024),
      treat_physic_3 VARCHAR(1024),
      treat_drug VARCHAR(1024),
      treat_surgery VARCHAR(1024)
  );
  <!--  
    * data
    LOAD DATA LOCAL INFILE '~/Documents/disease_info.csv'   
    INTO TABLE tb_disease_info   
    FIELDS TERMINATED BY ','   
    ENCLOSED BY '"'   
    LINES TERMINATED BY '\n'   
    IGNORE 1 LINES;
  -->
2. 엔터티CREATE TABLE tb_disease_info (
      dname VARCHAR(50) NOT NULL,
      target VARCHAR(50) NOT NULL,
      cause VARCHAR(1024),
      effect VARCHAR(1024),
      treat_no_surgery VARCHAR(1024),
      treat_physic_1 VARCHAR(1024),
      treat_physic_2 VARCHAR(1024),
      treat_physic_3 VARCHAR(1024),
      treat_drug VARCHAR(1024),
      treat_surgery VARCHAR(1024)
  );
  CREATE TABLE tb_custom_entity (
      eid INT NOT NULL AUTO_INCREMENT,
      ename VARCHAR(50) NOT NULL,
      enum INT,
      PRIMARY KEY(eid)
  );
  <!--  
  * data
  LOAD DATA LOCAL INFILE '~/Documents/entity_list.csv'   
  INTO TABLE tb_custom_entity   
  FIELDS TERMINATED BY ','   
  ENCLOSED BY '"'   
  LINES TERMINATED BY '\n'   
  IGNORE 1 LINES
  (ename,enum);
  -->
3. 액션
  CREATE TABLE tb_action_list (
      aid INT AUTO_INCREMENT,
      aname VARCHAR(40) NOT NULL,
      atype VARCHAR(30),
        isparent BOOL DEFAULT
      PRIMARY KEY (aid)
  );
4. 인텐트
CREATE TABLE tb_intent_list (
    tid INT AUTO_INCREMENT,
    tname VARCHAR(40) NOT NULL,
    ttype VARCHAR(30),
    PRIMARY KEY (aid)
);
