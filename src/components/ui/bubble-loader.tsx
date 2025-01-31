export default function BubbleLoader() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-2 w-2">
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-bounce shad-anim-bounce" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-ping-slow shad-anim-ping-slow">
          <div className="h-1 w-1 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shad-grad-chat" />
        </div>
      </div>
      <div className="relative h-2 w-2">
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-bounce shad-anim-bounce" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-ping-slow shad-anim-ping-slow" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-pulse shad-anim-pulse">
          <div className="h-1 w-1 rounded-full bg-gray-100 shad-inset-1-smooth" />
        </div>
      </div>
      <div className="relative h-2 w-2">
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-bounce shad-anim-bounce" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-ping-slow shad-anim-ping-slow" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-pulse shad-anim-pulse">
          <div className="h-1 w-1 rounded-full bg-gray-100 shad-inset-1-smooth" />
        </div>
      </div>
      <div className="relative h-2 w-2">
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-bounce shad-anim-bounce" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-ping-slow shad-anim-ping-slow" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full animate-pulse shad-anim-pulse">
          <div className="h-1 w-1 rounded-full bg-gray-100 shad-inset-1-smooth" />
        </div>
      </div>
    </div>
  );
}
