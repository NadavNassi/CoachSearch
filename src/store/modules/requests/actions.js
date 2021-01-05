export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://coach-selector-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const err = new Error(responseData.message || 'Failed to send request');
      throw err;
    }
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachid;
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coach-selector-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const err = new Error(responseData.message || 'Failed to load requests');
      throw err;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  }
};
