export interface LocalGovernment {
    _id: string;
    name: string;
    houseUploads: string[];
    agentsAssigned: string[];
    createdAt: string;
    updatedAt: string
}

export interface ApiData  {
    name: string
    isFavorite: boolean
}

export interface LocalGovernmentDetails {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    houseUploads: [
        {
            locationAddress: {
                region: string;
                streetAddress: string;
            },
            houseImages: string[];
            _id: string;
            houseType:  string;
            localGovernment:  string;
            uploadedBy: {
                _id:  string;
                firstName:  string;
                lastName: string;
            },
            createdAt:string;
            updatedAt: string;
        }
    ];
    agentsAssigned: [
        {
            houseUploads: string[];
            _id:  string;
            agentID:  string;
            firstName: string;
            lastName: string;
        }
    ];
}

export interface Agents {
    _id: string;
    agentID: string;
    localGovernmentAssigned: string[];
    houseUploads:  string[];
    firstName: string,
    lastName: string,
    createdAt: string;
    updatedAt: string
}


export interface  Top5LocalGovernmentsWithUploads {
    _id: string;
    housesUploaded: number;
    name: string;
}

export interface  Top5AgentWithUploads {
    _id: string;
    firstName: string;
    lastName: string;
    housesUploaded: number;
    localgovernment: {
        name: string
    }
}

