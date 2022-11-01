import { NextFunction, Request, Response } from 'express';

/**
 * @abstract BaseController
 */
export abstract class BaseController {
    /**
     * @method executeImpl()
     * Implemented by child class.
     */
    protected abstract executeImpl(request: Request, response: Response): Promise<any>;

    /**
     * @method execute()
     * Called by router.
     */
    public execute = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
        try {
            await this.executeImpl(request, response);
        } catch (error) {
            next(error);
        }
    };

    protected created(response: Response) {
        return response.sendStatus(201);
    }

    protected ok<T>(response: Response, dto?: T) {
        if (dto != null) {
            response.type('application/json');
            return response.status(200).json(dto);
        }
        return response.sendStatus(200);
    }
}

export default BaseController;
