const partnerToClientRes = (partners) => {
    return partners.map((partner) => ({
        id: partner.id,
        client: partner.client,
    }));
};

module.exports = {
    partnerToClientRes,
};