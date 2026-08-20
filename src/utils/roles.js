export const roles = [
    { id: 1, type: "admin" },
    { id: 2, type: "client" },
    { id: 3, type: "servee" },
];

export const roleId = (type) => roles.find((role) => role.type === type)?.id;
export const roleType = (id) => roles.find((role) => role.id === id)?.type;

export const dashboardPath = (id) => {
    const type = roleType(id);
    return type === "client" || type === "servee" ? `/dashboard/${type}` : null;
};
