require "sinatra"
require	"slim"

get "/" do
  slim :index
end

get "/about" do
  slim :about
end

get "/route" do
  slim :route
end

get "/station" do
  slim :station
end
