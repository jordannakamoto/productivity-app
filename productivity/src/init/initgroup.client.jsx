import React, { Suspense, lazy } from 'react';

// Lazy load the components
const DatabaseSetup = lazy(() => import('./db.client'));
const WindowTitle = lazy(() => import('./windowtitle.client'));

function InitGroup() {
    return (
        // Wrap lazy components with Suspense and provide a fallback UI
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <DatabaseSetup/>
                <WindowTitle/>
            </>
        </Suspense>
    );
}

export default InitGroup;
