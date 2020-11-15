import 'package:flutter/material.dart';

class MapNode extends StatelessWidget {
  final double x;
  final double y;
  final String track;
  final Function onTap;
  final double size;
  const MapNode({Key key, this.x, this.y, this.track, this.onTap, this.size})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: x,
      top: y,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          color: Colors.red,
          child: SizedBox(
            height: size,
            width: size,
          ),
        ),
      ),
    );
  }
}
