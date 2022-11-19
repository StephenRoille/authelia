import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { IndexRoute, SettingsTwoFactorAuthenticationSubRoute } from "@constants/Routes";
import { useRouterNavigate } from "@hooks/RouterNavigate";
import { useAutheliaState } from "@hooks/State";
import SettingsLayout from "@layouts/SettingsLayout";
import { AuthenticationLevel } from "@services/State";
import SettingsView from "@views/Settings/SettingsView";
import TwoFactorAuthenticationView from "@views/Settings/TwoFactorAuthentication/TwoFactorAuthenticationView";

export interface Props {}

const SettingsRouter = function (props: Props) {
    const navigate = useRouterNavigate();
    const [state, fetchState, , fetchStateError] = useAutheliaState();

    // Fetch the state on page load
    useEffect(() => {
        fetchState();
    }, [fetchState]);

    useEffect(() => {
        if (fetchStateError || (state && state.authentication_level < AuthenticationLevel.OneFactor)) {
            navigate(IndexRoute);
        }
    }, [state, fetchStateError, navigate]);

    return (
        <SettingsLayout>
            <Routes>
                <Route path={IndexRoute} element={<SettingsView />} />
                <Route
                    path={SettingsTwoFactorAuthenticationSubRoute}
                    element={<TwoFactorAuthenticationView state={state} />}
                />
            </Routes>
        </SettingsLayout>
    );
};

export default SettingsRouter;
