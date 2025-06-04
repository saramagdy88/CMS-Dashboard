<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;


class MediaController extends Controller
{
public function upload(Request $request)
{
  
    $file = $request->file('image');

    if (is_array($file)) {
        $file = reset($file);
    }


    $path = $file->store('uploads', 'public');

    $media = Media::create([
        'name' => $file->getClientOriginalName(),
        'url' => Storage::url($path),
    ]);

    return response()->json($media);
}



public function index()
{
 $media= Media::all();
 return response()->json($media);
}



public function delete(Request $request)
{
    $url = $request->input('url');
    $filename = basename($url);

 
    if (Storage::disk('public')->exists('uploads/' . $filename)) {
        Storage::disk('public')->delete('uploads/' . $filename);
    }

   
    \App\Models\Media::where('url', $url)->delete();

    return response()->json(['message' => 'Image deleted successfully']);
}
















}
