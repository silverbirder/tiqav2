import {IUseCase} from '../../1_enterprise_business_rules/use_cases/iUseCase';
import * as http from "http";

export interface IRequest {
    keyword: string;
    quote: string;
    tags: Array<string>;
    url: string;
    id: number;
    extension: string;
}

export interface IResponse extends http.ServerResponse {
    send(ResBody: any): any;
}

export interface IController {
    useCase: IUseCase;
    useCaseType: Symbol;

    run(q: IRequest): Promise<void>;
}