import express, { NextFunction, Request, Response, Router } from "express";


// -----------------------------------------------------------------------------------------------

export class UserController {
    public router = Router()

    wrapMethod(method: (res: Response) => object | Promise<object>) {
        method = method.bind(this)
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let json = await method(res)
                res.json(json)
            } catch (error) {
                next(error)
            }
        }
    }
    // constructor(
    //     private userService: UserService,
    // ) {
    //     // this.router.get('/user/session', isLoggedIn, this.getUsername)
    //     // this.router.get('/user/cancelCollect', isLoggedIn, this.getUsername)
    //     this.router.get('/user/username', this.getUsername)

    // }

    // -----------------------------------------------------------------------------------------------

    // async getUsername(req: Request, res: Response) {
    //     try {
    //         if (req.session.email) {
    //             res.json({ message: "login success", data: req.session.username })

    //         } else {
    //             res.status(400).json({ message: "you are not login" })
    //         }

    //     } catch (error: any) {
    //         res.status(400).json({ message: error.message })
    //     }
    // }

}
