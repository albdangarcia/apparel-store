const InputErrorMessage = ({ error }: { error: string }) => {
    return (
        <p className="mt-2 text-sm text-red-500">
            {error}
        </p>
    );
}

export default InputErrorMessage;