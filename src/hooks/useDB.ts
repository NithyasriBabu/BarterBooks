import React from "react";

export default function useDB(db) {
  const executeQuery = (sql: string, params = []) => {
    new Promise((resolve, reject) => {
      db.transaction((trans) => {
        trans.executeQuery(sql, params, (trans, results) => {
          resolve(results);
        },
        (error) => {
          reject(error);
        });
      });
    });
  };

    // Create Table
    const createTable = async (tableName: string, fields: string ) => {
      let Table = await executeQuery("CREATE TABLE IF NOT EXISTS " + tableName + " " + fields,[]);
      console.log(Table);
      return Table;
    };

    const insertToTable =async (tableName: string, fields: string, values: string, defaults: []) => {
      let Table = await executeQuery("INSERT INTO " + tableName + " " + fields + " VALUES " + values, defaults);
      console.log(Table);
      return Table;
    }

    const selectFromTable = async (tableName: string) => {
      let Table = await executeQuery("SELECT * FROM " + tableName,[]);
      console.log(Table);
      return Table;
    }

  return { createTable, insertToTable, selectFromTable };
}

