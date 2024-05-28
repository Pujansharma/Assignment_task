// utils/budgetAlerts.js

const checkBudgetOverspending = (monthlyExpenses, budgetLimits) => {
    const alerts = {};

    for (const category in monthlyExpenses) {
        if (monthlyExpenses[category] > budgetLimits[category]) {
            alerts[category] = 'You have exceeded your budget for this category.';
        }
    }

    return alerts;
};
