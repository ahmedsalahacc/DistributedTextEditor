$middlewarePort=5000
$serverPort=5100
$middlewareDebug="True"
$serverDebug="True"

python ./servers/app.py $middlewarePort=5000
python ./middleware/app.py $serverPort=5100