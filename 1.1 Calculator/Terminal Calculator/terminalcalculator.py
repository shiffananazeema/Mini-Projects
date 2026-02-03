while True:
    expr = input(">>> ").strip()
    if expr.lower() in {"exit", "quit"}:
        break

    try:
        result = eval(expr)
        print(result)
    except Exception:
        print("Error")
    