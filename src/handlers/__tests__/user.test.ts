import * as user from '../user';

describe('user handler', () => {
    it("should return a new user", async () => {
        const req = { 
            body: {
                username: "testuser",
                password: "testpassword"
            }
        }
        const res = {
            json({ token }) {
                expect(token).toBeTruthy();
            }
        }

        await user.createNewUer(req, res, () => {});
    });
});