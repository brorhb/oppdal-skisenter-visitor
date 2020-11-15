import 'package:flutter/material.dart';
import 'package:visitor/src/providers/TracksProvider/main.dart';
import 'package:visitor/src/screens/Homescreen.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider<TracksProvider>(create: (_) => TracksProvider()),
      ],
      child: App(),
    ),
  );
}

class App extends StatefulWidget {
  const App({Key key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      TracksProvider tracksProvider =
          Provider.of<TracksProvider>(context, listen: false);
      tracksProvider.fetch();
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}
