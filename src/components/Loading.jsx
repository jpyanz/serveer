const Loading = () => {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex min-h-screen items-center justify-center">
            <span className="size-10 animate-spin rounded-full border-4 border-green-700/20 border-t-green-700" />
            <span className="sr-only">Loading…</span>
        </div>
    );
};

export default Loading;
