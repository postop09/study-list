{
    type NetworkErrorState = {
        result: "fail";
        reason: "offline" | "down" | "timeout";
    }
    type SuccessState = {
        result: "success";
    }
    type ResultState = SuccessState | NetworkErrorState;
    class NetworkClient {
        tryConnect(): ResultState {
            return {
                result: "fail",
                reason: "down",
            }
        }
    }

    class UserService {
        constructor(private client: NetworkClient) {}
        login() {
            this.client.tryConnect();
            // login...
        }
    }

    const client = new NetworkClient();
    const service = new UserService(client);
    service.login();



    class App {
        constructor(private userService: UserService) {}
        run() {
            try {
                this.userService.login();
            } catch (e) {
                // show dialog to user... 의미있는 에러핸들링을 할 수 있는 위치를 고민하자.
            }
        }
    }

    const app = new App(service);
    app.run();
}