<?php

namespace App\Http\Controllers;

use App\Models\Post_type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    $types = Post_type::select('id', 'name' ,'slug')->get();
     return response()->json($types);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('PostTypeCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post_type = new Post_type();
        $post_type->name = $request->name ;
        $post_type->slug = $request->slug ;
        $post_type->save() ;
        return inertia('Dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post_type $post_type)
    {
        return 'read jwkjj';
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $post_type= Post_type::findOrFail($id);
         return inertia('PostTypeEdit',[
        'id' => $post_type->id,
        'name' =>  $post_type->name,
        'slug'=> $post_type->slug
    ]); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
         $post_type= Post_type::findOrFail($id);
         $post_type->name = $request->name ;
         $post_type->slug = $request->slug ;
         $post_type->save() ;

        return inertia('Dashboard');

      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post_type $post_type)
    {
     
    }
}
