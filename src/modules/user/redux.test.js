import { expect } from 'chai';
import { restApp } from 'app';


describe('integration tests', () => {

  beforeAll(() => {
    return restApp.authenticate({accessToken: process.env.TOKEN });
  })

  describe('restApp.get(id)', () => {
    let user;

    beforeAll(() => {
      return restApp.service('users').get(process.env.USER_ID)
        .then((res) => {
          user = res;
        })
    })

    it('should return the authenticated user', () => {
      expect(user._id).to.equal(process.env.USER_ID);
      expect(user.usernameLower).to.equal(process.env.USERNAME);
      expect(user.email).to.equal(process.env.EMAIL);
    });

    it('should not return password hash', () => {
      expect(user.password).to.equal(undefined);
    });
  });

  describe('restApp.patch(id, data)', () => {
    let user;

    beforeEach(() => {
      return restApp.service('users')
        .get(process.env.USER_ID)
        .then((res) => {
          user = res;
        });
    });

    afterEach(() => {
      // restore user
      // we don't want to update with these props
      // should handle these more elegantly on backend
      // on backend
      delete user._id
      delete user._v
      delete user.email
      delete user.usernameLower
      delete user.username
      return restApp.service('users')
        .patch(process.env.USER_ID, user)
    })

    it('should update user with object', () => {
      const patch = {online: true, listenAnytime: true};
      return restApp.service('users').patch(process.env.USER_ID, patch).then((res) => {
        expect(res).to.to.deep.include(patch);
      })
    })

  });

});
