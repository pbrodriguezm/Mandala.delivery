/**
 * PostgREST API
 * standard public schema
 *
 * OpenAPI spec version: 7.0.0 (2b61a63)
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface AppUnidad { 
    /**
     * Note: This is a Primary Key.<pk/>
     */
    idunidad: string;
    unidad?: string;
    /**
     * Note: This is a Foreign Key to `app_estado.idestado`.<fk table='app_estado' column='idestado'/>
     */
    idestado?: number;
}
