<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next ,$permission): Response
    {
          $user = auth()->user();

            if (!$user) {
                abort(403, 'Unauthorized.');
            }

            if ($user->role === 'admin') {
                return $next($request);
            }

            if (!in_array($permission, $user->permission ?? [])) {
                abort(403, "You do not have permission: $permission");
            }

            return $next($request);
    }
}
