import 'package:expandable_bottom_sheet/expandable_bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:visitor/src/widgets/MapView.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double size = width / 90;
    return Scaffold(
      appBar: AppBar(
        title: Text("Løype oversikt"),
      ),
      body: Container(
        child: Container(
          constraints: BoxConstraints(maxWidth: 3005),
          child: ExpandableBottomSheet(
            background: GestureDetector(
              onTapDown: (TapDownDetails details) {
                print(details.localPosition);
              },
              child: MapView(width: width, size: size),
            ),
            expandableContent: Container(
              color: Theme.of(context).scaffoldBackgroundColor,
              child: Text("Hello"),
            ),
          ),
        ),
      ),
    );
  }
}
