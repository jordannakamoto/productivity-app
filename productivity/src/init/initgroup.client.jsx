import React, { Suspense, lazy } from 'react';

// Lazy load the components
const DatabaseTest = lazy(() => import('./db.client'));
const WindowTitle = lazy(() => import('./windowtitle.client'));

function InitGroup() {
    return (
        // Wrap lazy components with Suspense and provide a fallback UI
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <DatabaseTest/>
                <WindowTitle/>
            </>
        </Suspense>
    );
}

export default InitGroup;
