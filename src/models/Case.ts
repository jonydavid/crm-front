export interface CasesModel {
    "id": number;
    "Creado el": Date;
    "Numero de Ticket": string;
    "Tipo": string;
    "Subtipo": string;
    "Tipificacion": string;
    "Sucursal Recepcion": string;
    "Hora de Recepcion": string;
    "Sucursal Afectada": string;
    "Estado": string;
    "Origen": string;
    "Subject": string;
    "Descripcion": string;
    "Dueño del caso": string;
    "Areas Resolutoras": string;
    "Empresa": string;
    "Direccion de Llamada": string;
    "Tags": string;
    "Actualizado el": string;
    "Solucion": string;
    "Comentario": string;
    "Pedido de extension": boolean;
    "Oficial de Negocios": string;
    "Promotor": string;
    "Numero de Comentarios": number;
    "Contacto": string;
    "Email": string;
    "Nro de Cliente":string;
    "Telfono Contacto":string;
    "Contacto Full name":string;
    "Sucursal Cliente":string;
    "Layout":string;
}

export interface CaseDetailModel {
    id:                      number;
    caseStatusName:          string;
    originName:              string;
    caseOwnerUserName:       string;
    contactFullname:         string;
    contactPhone:            null;
    ticketNumber:            string;
    time:                    string;
    companyName:             string;
    contactDocumentTypeName: string;
    contactDocumentNumber:   null;
    contactClientCode:       null;
    contactBranchName:       null;
    contactMobile:           null;
    promoterFullName:        string;
    promoterPhone:           null;
    promoterDocumentNumber:  null;
    promoterEmail:           null;
    typeName:                string;
    subtypeName:             string;
    typificationName:        string;
    description:             null;
    design:                  null;
    callDirection:           string;
    updatedAt:               null;
    createdAt:               string;
    idServidesk:             null;
    resolverAreas:           any[];
    resolvers:               any[];
    businessOfficerName:     null;
    solution:                null;
    requestExtension:        string;
}
    
export interface CreateCaseModel {
    contactId:	        number,
    companyId:	        number,
    promoterId:	        number,
    callDirectionId:	number,
    typeId:	            number,
    subtypeId:	        number,
    typificationId:	    number,
    subject:	        string,
    description:	    string,
    originId:	        number,
    caseOwnerId:	    number,
    caseStatusId:	    number,
    idServidesk:	    string,
    resolutionAreaIds:	number,
    resolverIds:        number,
    businessOfficer:	string,
    solution:	        string,
    clientComment:	    string,
    qualification:	    string,
    requestExtension:	boolean,
    attachmentFile:	    string

}
