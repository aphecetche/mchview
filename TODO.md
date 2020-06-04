# sync URL params and Redux store, or not ?

see https://stackoverflow.com/questions/36596996/how-to-sync-redux-state-and-url-query-params/36657751#36657751
and https://github.com/pbeshai/use-query-params, or https://reacttraining.com/react-router/web/guides/deep-redux-integration for (counter) arguments.

Tendency seems to _not_ keep the routes in the redux store at all. That could make sense but then the question is how to deal with the `DePlaneSelector` for instance.
But the advantage of not trying a complex solution of two-way syncing (between URL params and Redux) is that it might not be needed in many places after all. e.g. knowing the (deid,bending) pair is only relevant for the DePlaneView, and only for this one. So in that sense it makes no sense to have it in the global Redux state ?
