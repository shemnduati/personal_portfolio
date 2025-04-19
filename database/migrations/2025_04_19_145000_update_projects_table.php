<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Rename existing columns
            $table->renameColumn('short_description', 'description');
            $table->renameColumn('full_description', 'content');
            $table->renameColumn('github_link', 'github_url');
            $table->renameColumn('live_link', 'live_url');
            
            // Drop columns we don't need
            $table->dropColumn(['project_date', 'tech_stack', 'project_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Revert column renames
            $table->renameColumn('description', 'short_description');
            $table->renameColumn('content', 'full_description');
            $table->renameColumn('github_url', 'github_link');
            $table->renameColumn('live_url', 'live_link');
            
            // Add back dropped columns
            $table->date('project_date')->nullable();
            $table->string('tech_stack')->nullable();
            $table->string('project_type')->nullable();
        });
    }
}; 