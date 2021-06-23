<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($request->is("api/*")) {
            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response()->json(
                    $exception->errors(),
                    $exception->status
                );
            } else if (
                $exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException
                || $exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
            ) {
                return response()->json(['message' => 'Not Found'], 404);
            } else if ($exception instanceof \Illuminate\Database\QueryException) {
                return response()->json(['message' => 'Database Error'], 400);
            } else {
                if (config('app.debug')) {
                    return response()->json(['message' => $exception->getMessage()], 500);
                }
                return response()->json(['message' => 'Internal Server Error'], 500);
            }
        }

        return parent::render($request, $exception);
    }
}
