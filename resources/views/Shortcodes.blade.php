@php
if (!function_exists('styleArrayToString')) {
    function styleArrayToString($styleArray) {
        return collect($styleArray)->map(function($value, $key) {

            $kebabKey = strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $key));
            return "$kebabKey: $value;";
        })->implode(' ');
    }
}

$cardStyleArray        = json_decode(urldecode($cardStyle        ?? '{}'), true);
$titleStyleArray       = json_decode(urldecode($titleStyle       ?? '{}'), true);
$imageStyleArray       = json_decode(urldecode($imageStyle       ?? '{}'), true);
$descriptionStyleArray = json_decode(urldecode($descriptionStyle ?? '{}'), true);
@endphp

<div style="{{ styleArrayToString($cardStyleArray) }}">
    <img src="{{ $image }}"
         style="{{ styleArrayToString($imageStyleArray) }}" />
    <h2 style="{{ styleArrayToString($titleStyleArray) }}">
        {{ $title }}
    </h2>
    <div style="{{ styleArrayToString($descriptionStyleArray) }}">
        {!! $description !!}
    </div>
</div>



{{-- <pre>
    CardStyle (raw): {{ $cardStyle }}
    CardStyle (decoded): {{ json_encode(json_decode(urldecode($cardStyle ?? '{}')), JSON_PRETTY_PRINT) }}


      title style (raw): {{ $titleStyle }}
   title style (decoded): {{ json_encode(json_decode(urldecode($titleStyle ?? '{}')), JSON_PRETTY_PRINT) }}

     desc style (raw): {{ $descriptionStyle }}
    desc style (decoded): {{ json_encode(json_decode(urldecode($descriptionStyle ?? '{}')), JSON_PRETTY_PRINT) }}
</pre> --}}
