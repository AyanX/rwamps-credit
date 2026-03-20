const statsToClient = (stats) => {
    return {
        loans_disbursed: stats.loans_disbursed,
        loans_disbursed_initials: stats.loans_disbursed_initials,
        repayment_rate: stats.repayment_rate,
        total_disbursed: stats.total_disbursed,
        locations_served: stats.locations_served,
        serving_hours: stats.serving_hours,
        serving_days: stats.serving_days,
        active_users: stats.active_users,
        active_users_initials: stats.active_users_initials,
        total_clients: stats.total_clients,
        total_clients_initials: stats.total_clients_initials
    }
}

const validateStatsInput = (data) => {
    const requiredFields = [
        "loans_disbursed",
        "loans_disbursed_initials",
        "repayment_rate",
        "total_disbursed",
        "locations_served",
        "serving_hours",
        "serving_days",
        "active_users",
        "active_users_initials",
        "total_clients",
        "total_clients_initials"
    ];

    for (const field of requiredFields) {
        if (!data.hasOwnProperty(field)) {
            return false
        }
    }

    return  true 
}



const statsToDb = (data) => {
    return {
        loans_disbursed: data.loans_disbursed,
        loans_disbursed_initials: data.loans_disbursed_initials,
        repayment_rate: data.repayment_rate,
        total_disbursed: data.total_disbursed,
        locations_served: data.locations_served,
        serving_hours: data.serving_hours,
        serving_days: data.serving_days,
        active_users: data.active_users,
        active_users_initials: data.active_users_initials,
        total_clients: data.total_clients,
        total_clients_initials: data.total_clients_initials
    }
}

module.exports = {
    statsToClient,
    validateStatsInput,
    statsToDb,
}