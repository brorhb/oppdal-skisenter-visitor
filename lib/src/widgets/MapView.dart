import 'package:flutter/material.dart';
import 'package:visitor/src/widgets/MapNode.dart';

class MapView extends StatelessWidget {
  const MapView({
    Key key,
    @required this.width,
    @required this.size,
  }) : super(key: key);

  final double width;
  final double size;

  @override
  Widget build(BuildContext context) {
    return InteractiveViewer(
      child: Stack(
        alignment: AlignmentDirectional.topStart,
        children: [
          Image.asset(
            "assets/løypekart.png",
            fit: BoxFit.fitWidth,
            width: width,
          ),
          MapNode(
            x: width / 9.1,
            y: width / 5.4,
            track: "henlo",
            size: size,
            onTap: () {
              print("tapped");
            },
          ),
          MapNode(
            x: width / 6.75,
            y: width / 5.5,
            track: "henlo",
            size: size,
            onTap: () {
              print("tapped");
            },
          ),
          MapNode(
            x: width / 5,
            y: width / 8,
            track: "henlo",
            size: size,
            onTap: () {
              print("tapped");
            },
          ),
          MapNode(
            x: width / 4.9,
            y: width / 11.6,
            track: "henlo",
            size: size,
            onTap: () {
              print("tapped");
            },
          ),
          MapNode(
            x: width / 8.5,
            y: width / 4.7,
            track: "henlo",
            size: size,
            onTap: () {
              print("tapped");
            },
          ),
          MapNode(
            x: width / 6.6,
            y: width / 4.4,
            track: "henlo",
            size: size,
            onTap: () {
              print("tapped");
            },
          ),
        ],
      ),
    );
  }
}
