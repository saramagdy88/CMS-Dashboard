
<div style="{{ urldecode($cardStyle ?? '') }}">
   <img src="{{ $image }}" style="{{ urldecode($imageStyle ?? '') }}" />
   <h5 style="{{ urldecode($titleStyle ?? '') }}">{{ $title }}</h5>
   <div style="{{ urldecode($descriptionStyle ?? '') }}">{!! $description !!}</div>
</div>




