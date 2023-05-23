function controller(view) {

    const URL_NEW_LEAD = `/user`;
    const URL_NO_LEAD = `/user/no-lead`;

    async function postRequest(userData, URL) {
        console.log(':D POST');
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        console.log('fetch');
        return await fetch(URL, request);
    }

    view.onSubmitLead = (newLead) => {
        let newInteraction = {
            OS: newLead.OS,
            date: newLead.date,
            timeStamp: newLead.timeStamp,
        }
        postRequest({ newLead, newInteraction }, URL_NEW_LEAD);
        console.log(`submited:`);
        console.table({ newLead, newInteraction });
    }

    view.onNoLead = (noLead) => {
        postRequest({noLead}, URL_NO_LEAD);
        console.log(`submited:`);
        console.table(noLead);
    }

    view.render();
}
let view = new View();
controller(view);