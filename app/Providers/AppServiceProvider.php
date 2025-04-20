<?php

namespace App\Providers;

use App\Models\Project;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        Inertia::share([
            'projects' => fn () => Project::with('category')
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }
}
