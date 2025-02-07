import { my_approvals, purchase_requests } from "@/paraglide/messages";

export interface FavMenuItem {
    title: string;
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    visible: boolean;
    enabled: boolean;
}

export const favoriteMenu: FavMenuItem[] = [
    {
        title: `${my_approvals()}`,
        path: "/procurement/my-approvals",
        visible: true,
        enabled: true,
    },
    {
        title: `${purchase_requests()}`,
        path: "/procurement/purchase-requests",
        visible: true,
        enabled: true,
    },

];